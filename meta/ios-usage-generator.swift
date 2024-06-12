import Foundation

/*
Eugene's low tech iOS usage generator. Easiest to run this on CodeRunner for macOS.

Steps:
1. Go to https://gs.statcounter.com/ios-version-market-share/mobile-tablet/worldwide.
2. Select "Download Data (.csv)"
3. From the CSV file, copy the first line (column names) and last line (latest data).
*/

let data = """
"Date","iOS 16.6","iOS 16.5","iOS 17.1","iOS 17.4","iOS 17.3","iOS 17.2","iOS 16.3","iOS 16.1","iOS 16.4","iOS 17.0","iOS 15.7","iOS 16.7","iOS 16.0","iOS 16.2","iOS 15.6","iOS 15.8","iOS 12.5","iOS 15.5","iOS 15.4","iOS 14.8","iOS 14.7","iOS 14.4","iOS 10.3","iOS 15.3","iOS 14.6","iOS 15.1","iOS 17.5","iOS 15.2","iOS 9.3","iOS 15.0","iOS 13.2","iOS 13.3","iOS 11.0","iOS 14.2","iOS 13.6","iOS 14.3","iOS 12.4","iOS 13.7","iOS 14.5","iOS 11.3","iOS 14.0","iOS 13.5","iOS 14.1","iOS 12.1","iOS 12.3","iOS 7.0","iOS 11.4","iOS 13.4","iOS 13.1","iOS 6.0","iOS 12.2","iOS 9.1","iOS 12.0","iOS 11.2","iOS 7.1","iOS 9.2","iOS 4.3","iOS 10.2","iOS 5.0","iOS 8.4","iOS 11.1","iOS 9.0","iOS 8.1","iOS 10.1","Other"
2024-05,3.42,0.97,1.37,59.95,2.64,1.43,2.27,2.7,0.48,0.84,0.88,4.31,1.31,1.31,1.37,3.51,1.3,0.64,0.51,0.31,0.27,0.26,0.36,0.26,0.21,0.22,4.23,0.19,0.23,0.19,0.14,0.07,0.5,0.11,0.13,0.09,0.08,0.11,0.06,0.07,0.05,0.05,0.04,0.04,0.04,0.05,0.03,0.03,0.03,0.05,0.03,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.01,0.01,0.01,0.01,0.02,0.05
"""

let rows = data.split(separator: "\n")

let iOSVersions = Array(rows[0].split(separator: ",")[1...])
let percentages = Array(rows[1].split(separator: ",")[1...])

var iOS17 = 0.0
var iOS16 = 0.0
var iOS15 = 0.0
var iOS14 = 0.0
var iOS13 = 0.0
var iOS12 = 0.0
var iOS11 = 0.0
var iOS10 = 0.0
var iOS9 = 0.0
var iOS8 = 0.0
var iOS7 = 0.0
var iOS6 = 0.0
var iOS5 = 0.0
var iOS4 = 0.0
var iOS3 = 0.0
var iOS2 = 0.0
var iOS1 = 0.0

for i in 0..<iOSVersions.count {
    if String(iOSVersions[i]).contains("iOS 17.") {
        iOS17 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 16.") {
        iOS16 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 15.") {
        iOS15 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 14.") {
        iOS14 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 13.") {
        iOS13 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 12.") {
        iOS12 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 11.") {
        iOS11 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 10.") {
        iOS10 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 9.") {
        iOS9 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 8.") {
        iOS8 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 7.") {
        iOS7 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 6.") {
        iOS6 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 5.") {
        iOS5 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 4.") {
        iOS4 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 3.") {
        iOS3 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 2.") {
        iOS2 += Double(percentages[i])!
    } else    if String(iOSVersions[i]).contains("iOS 1.") {
        iOS1 += Double(percentages[i])!
    }
}

iOS16 += iOS17
iOS15 += iOS16
iOS14 += iOS15
iOS13 += iOS14
iOS12 += iOS13
iOS11 += iOS12
iOS10 += iOS11
iOS9 += iOS10
iOS8 += iOS9
iOS7 += iOS8
iOS6 += iOS7
iOS5 += iOS6
iOS4 += iOS5
iOS3 += iOS4
iOS2 += iOS3
iOS1 += iOS2

// Round to 1 decimal place
iOS17 = round(iOS17 * 10) / 10.0
iOS16 = round(iOS16 * 10) / 10.0
iOS15 = round(iOS15 * 10) / 10.0
iOS14 = round(iOS14 * 10) / 10.0
iOS13 = round(iOS13 * 10) / 10.0
iOS12 = round(iOS12 * 10) / 10.0
iOS11 = round(iOS11 * 10) / 10.0
iOS10 = round(iOS10 * 10) / 10.0
iOS9 = round(iOS9 * 10) / 10.0
iOS8 = round(iOS8 * 10) / 10.0
iOS7 = round(iOS7 * 10) / 10.0
iOS6 = round(iOS6 * 10) / 10.0
iOS5 = round(iOS5 * 10) / 10.0
iOS4 = round(iOS4 * 10) / 10.0
iOS3 = round(iOS3 * 10) / 10.0
iOS2 = round(iOS2 * 10) / 10.0
iOS1 = round(iOS1 * 10) / 10.0

print("iOS 17: \(iOS17)")
print("iOS 16: \(iOS16)")
print("iOS 15: \(iOS15)")
print("iOS 14: \(iOS14)")
print("iOS 13: \(iOS13)")
print("iOS 12: \(iOS12)")
print("iOS 11: \(iOS11)")
print("iOS 10: \(iOS10)")
print("iOS 9: \(iOS9)")
print("iOS 8: \(iOS8)")
print("iOS 7: \(iOS7)")
print("iOS 6: \(iOS6)")
print("iOS 5: \(iOS5)")
print("iOS 4: \(iOS4)")
print("iOS 3: \(iOS3)")
print("iOS 2: \(iOS2)")
print("iOS 1: \(iOS1)")
