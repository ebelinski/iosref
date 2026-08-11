import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif

/*
Eugene's low tech iOS usage generator, now with automatic data download.

Fetches the latest monthly iOS version market share data from Statcounter
GlobalStats (https://gs.statcounter.com/ios-version-market-share/mobile-tablet/worldwide)
and prints the cumulative usage of each major iOS version, ready to be
copied into _subpages/ios-usage.md.

Run with:

  swift meta/ios-usage-generator.swift

Notes:
- The last *full* month is used (e.g. running in August prints July data).
- Statcounter sometimes reports phantom versions that were never released
  (e.g. an "iOS 11.0" spike, or "iOS 19.0"). Majors 19-25 are skipped, since
  Apple's version numbering jumped from 18 to 26.
*/

// Request the two most recent full months; the last CSV row is the latest.
let calendar = Calendar(identifier: .gregorian)
guard let lastFullMonth = calendar.date(byAdding: .month, value: -1, to: Date()),
      let monthBefore = calendar.date(byAdding: .month, value: -2, to: Date()) else {
  fatalError("Could not compute date range")
}
let monthFormatter = DateFormatter()
monthFormatter.dateFormat = "yyyy-MM"
let fromMonth = monthFormatter.string(from: monthBefore)
let toMonth = monthFormatter.string(from: lastFullMonth)

var components = URLComponents(string: "https://gs.statcounter.com/ios-version-market-share/mobile-tablet/chart.php")!
components.queryItems = [
  URLQueryItem(name: "device", value: "Mobile & Tablet"),
  URLQueryItem(name: "device_hidden", value: "mobile+tablet"),
  URLQueryItem(name: "multi-device", value: "true"),
  URLQueryItem(name: "statType_hidden", value: "ios_version"),
  URLQueryItem(name: "region_hidden", value: "ww"),
  URLQueryItem(name: "granularity", value: "monthly"),
  URLQueryItem(name: "statType", value: "iOS Version"),
  URLQueryItem(name: "region", value: "Worldwide"),
  URLQueryItem(name: "fromInt", value: fromMonth.replacingOccurrences(of: "-", with: "")),
  URLQueryItem(name: "toInt", value: toMonth.replacingOccurrences(of: "-", with: "")),
  URLQueryItem(name: "fromMonthYear", value: fromMonth),
  URLQueryItem(name: "toMonthYear", value: toMonth),
  URLQueryItem(name: "csv", value: "1"),
]

// Statcounter rejects requests without a browser-like User-Agent.
var request = URLRequest(url: components.url!)
request.setValue(
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  forHTTPHeaderField: "User-Agent"
)

var csv = ""
let semaphore = DispatchSemaphore(value: 0)
URLSession.shared.dataTask(with: request) { data, response, error in
  defer { semaphore.signal() }
  if let error = error {
    print("Download failed: \(error.localizedDescription)")
    exit(1)
  }
  guard let http = response as? HTTPURLResponse, http.statusCode == 200,
        let data = data, let text = String(data: data, encoding: .utf8) else {
    print("Download failed: unexpected response")
    exit(1)
  }
  csv = text
}.resume()
semaphore.wait()

let lines = csv.split(separator: "\n").map { $0.trimmingCharacters(in: .whitespaces) }.filter { !$0.isEmpty }
guard lines.count >= 2, lines[0].hasPrefix("\"Date\"") else {
  print("Unexpected CSV format, response started with:\n\(csv.prefix(300))")
  exit(1)
}

let header = lines[0].split(separator: ",").map { $0.trimmingCharacters(in: CharacterSet(charactersIn: "\"")) }
let latest = lines[lines.count - 1].split(separator: ",").map(String.init)

// Sum shares per major version ("iOS 18.5" and "iOS 18" both count toward 18).
var shareByMajor: [Int: Double] = [:]
for i in 1..<min(header.count, latest.count) {
  guard header[i].hasPrefix("iOS ") else { continue } // skips "Other"
  guard let major = Int(header[i].dropFirst(4).split(separator: ".").first ?? ""),
        let share = Double(latest[i]) else { continue }
  guard major <= 18 || major >= 26 else { continue } // phantom majors
  shareByMajor[major, default: 0] += share
}

// Cumulative usage: each major includes the share of every later major.
let majors = Set(shareByMajor.keys).union(1...18).sorted(by: >)
print("Data for \(latest[0]):\n")
var runningTotal = 0.0
for major in majors {
  runningTotal += shareByMajor[major] ?? 0
  print("iOS \(major): \(round(runningTotal * 10) / 10.0)")
}
