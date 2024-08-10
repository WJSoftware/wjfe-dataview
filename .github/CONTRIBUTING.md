# Contributing to @wjfe/dataview

Hello, and thank you for your interest in helping the growth of this project.

You may contribute to the library's core (the `WjDataView` component and related), or you may contribute to the demo 
pages (the live demo website).

If you're contributing to the demo website, skip the rest of the document.  Currently, there are no guidelines that 
could be particularly important for this.  The rest of the document is about contributing to the library's core.

---

Contributions are classified as **patches** or **new features**.  Each one has a different set of requisites, as 
explained next.

## Contributing Patches

> Patches are bug corrections.  No more, no less.

With the assistance of semantic versioning, patches:

1. Fix a problem (bug).
2. Do not add new features.
2. Do not break existing functionality.

Therefore, patching only increases the package's patch version number (the third one).

### How to Contribute a Patch

Start by making sure an issue exists that describes the problem and how it can be reproduced.  If there is no such 
issue, start by opening one.

Once the problem has been confirmed and acknowledged, a pull request can be created to address the problem.  Start the 
pull request as a draft pull request and request user `webJose` to review it by adding him to the list of reviewers.

Generally speaking, a pull request for a patch must:

+ Limit itself to patching the specific problem.
+ Contain at least one unit test that fails under the conditions specified in the open issue.  Unit tests' 
descriptions must start with `ISS-XXX`, where `XXX` is the issue number.
+ Be titled using the *Conventional Commits* methodology.  Example: `fix: Correct row expansion behavior`.

Just in case it is unclear, by the time the patch has been completed, the unit tests written for the issue must pass 
when the patch is applied.

## Contributing New Features

> New features add functionality to the component.

New features usually add new functionality, but can also be refactors of algorithms, performance increments or any 
other change that does not qualify as a patch.

### How to Contribute a New Feature

Start by making sure an issue exists that describes the feature.  If there is no such issue, start by opening one.

Issues for new features must include the motivation, ideally in the form of one or more use cases.  Examples of said 
cases are highly desirable.

Once the feature has been approved, a pull request can be created to implement it.  Start the pull request as a draft 
pull request and request user `webJose` to review it by adding him to the list of reviewers.

Generally speaking, a pull request for a new feature must:

+ Limit itself to the new feature.
+ Be titled using the *Conventional Commits* methodology.  Example: `feat: Stick expanded rows to the viewport`.
+ Include unit tests for the new feature.  See unit testing section below.
+ Include the new feature in the documentation, which currently is the repository's README file.
+ Include the new feature in the project's live demo pages.

If the work being done is not adding new functionality, and instead is refactoring for, say, performance reasons, then 
the documentation step can be skipped, as the documentation doesn't document the component's internals.

## About Unit Testing

Unit-testing the components in this library has a general structure:  **Initial rendering**, and **reactivity**.

Generally speaking, a component's property is tested for its default value (usually `undefined`), plus its other 
possible property values during *initial rendering*, and then the same property and values are tested again during a 
re-render of the component to ensure the component reacts appropriately to the property's reactive nature.