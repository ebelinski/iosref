# iOS Ref

[iOS Ref](https://iosref.com/) serves as a one-stop quick reference spot for iOS, iPadOS, watchOS, and tVOS developers. It is built with [Jekyll](https://jekyllrb.com/) and deployed on [GitHub Pages](https://pages.github.com/). Changes merged into the `main` branch are automatically deployed.

## Getting started

To make contributions, you can submit pull requests with changes to the relevant markdown files. However, if you would like to build the iOS Ref website locally, follow these instructions:

1. Install the [correct version](/.ruby-version) of Ruby, ideally using a tool such as [rbenv](https://github.com/rbenv/rbenv).
2. Install the project Ruby dependencies: `bundle install`.
3. Start the local Jekyll server: `bundle exec jekyll serve`.

The website should now be visible at http://127.0.0.1:4000/.

## Contributing

You may open issues for suggestions and pull request for proposed changes. All contributors must follow the [code of conduct](/CODE_OF_CONDUCT.md).

## License

This repository has two licenses. The MIT License, a software license, covers the whole repository except for the [`_subpages`](\_subpages) folder, which contains the content pages. The Attribution-ShareAlike 4.0 International license, a content license, covers the [`_subpages`](\_subpages) folder. See [LICENSE.md](/LICENSE.md) for more information.
