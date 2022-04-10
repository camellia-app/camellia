# How to Contribute

## Bugs

### Where to Find Known Issues

We are using [GitHub Issues](https://github.com/camellia-app/camellia/issues?q=is%3Aissue+is%3Aopen+label%3Abug) for our public bugs. Before filing a new task, try to make sure your problem doesn't already exist.

### Reporting New Issues

Please make sure you provide as much information about the issue as you can. If it's a bug, we recommend you to record a video and attach it to the issue, and provide debug information. To obtain debug information, open extension options, then choose "Advanced" in left menu and press "Copy debug information" button.

### Security Bugs

Check out our [security policy](./SECURITY.md).

## How to Get in Touch

We are using [GitHub Discussions](https://github.com/camellia-app/camellia/discussions) for public discussions about Camellia.

## Proposing a Change or Feature

If you intend to change something within Camellia or implement new feature, we recommend filing an issue. This lets us reach an agreement on your proposal before you put significant effort into it.

If you're only fixing a bug, it's fine to submit a pull request right away but we still recommend to file an issue detailing what you're fixing. This is helpful in case we don't accept that specific fix but want to keep track of the issue.

## Branch Organization

Submit all changes directly to the `main` branch. We don't use separate branches for development or for upcoming releases. We do our best to keep `main` in good shape, with all tests and quality checks passing.

## Updating dependencies

We use [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates) to manage automatic updates for all our dependencies. There is no need to open such pull requests on your own.

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series: [How to Contribute to an Open Source Projects on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/camellia-app/camellia/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that contain bugs or small tasks that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up for more than two weeks, it's fine to take it over but you should still leave a comment.

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. We’ll do our best to provide updates and feedback throughout the process.

**Before submitting a pull request**, please make sure the following is done:

1. Make sure you are familiar with our internal and external documentations available as [GitHub Wiki](https://github.com/camellia-app/camellia/wiki).
2. Your pull request was made from fresh version of `main` branch.
3. All status checks are passing: code style, static analysis, tests, it builds and does not produce new warnings.

It's also okay to open draft pull requests in case it's in progress.
