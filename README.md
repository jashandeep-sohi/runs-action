# runs-action

This action let's you run arbitrary commands at pre and post stages of a
workflow job (in addition to the ususal main step run).

Only Javascript actions support pre & post hooks, so this is handy when you
don't want to go through the hassle of creating a whole new Javascript action
just for something simple that could be done in a shell script.

## Usage

Basic example:

```yaml

steps:
  - uses: jashandeep-sohi/runs-action@master
    name: Test pre & post
    env:
      # This env var controls if the pre-stage should run
      PRE_IF: "true"

      # This env var controls if the post-stage should run
      POST_IF: "true"
    with:
      pre-run: |
        echo This runs at the pre-stage.
      main-run: |
        echo This runs the usual way.
      post-run: |
        echo And this runs at the post-stage.
```
