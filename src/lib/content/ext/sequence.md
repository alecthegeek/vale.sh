---
title: sequence
description: Learn about the sequence extension point.
---

| Name         | Type         | Description                                    |
| :----------- | :----------- | :--------------------------------------------- |
| `tokens`     | `[]NLPToken` | A list of tokens with associated NLP metadata. |
| `ignorecase` | `bool`       | Makes all matches case-insensitive.            |

While most extension points focus on writing _style_, `sequence` aims to
support grammar-focused rules.

```yaml
extends: sequence
# `%[4]s` is like `%s`, but specifically refers to the
# 4th token in our sequence.
message: |
  The infinitive '%[4]s' after 'be' requires 'to'.
  Did you mean '%[2]s %[3]s *to* %[4]s'?"
tokens:
  - tag: MD
  - pattern: be
  - tag: JJ
  # The `|` notation means that we'll accept `VB`
  # or `VBN` in position 4.
  - tag: VB|VBN
```

Every `sequence`-based rule is required to have at least one `pattern` (such as
`pattern: be`, shown above). This becomes the "anchor" of the sequence: we find
all instances of the first pattern and then check that the left- and right-hand
sides of the sequence match.

Each entry in a sequence is known as an `NLPToken` and has the following
structure:

```yaml
# [optional]: A regular expression (required
# if `tag` isn't given).
pattern: '...'

# [optional]: If true, indicates that we
# *shouldn't* match this token.
negate: true # or false

# [optional]: A part-of-speech tag (required
# if `pattern` isn't given).
tag: '...'

# [optional]: An integer meaning that there may
# be up to `n` (3, in this case) tokens between
# this token and the next one.
skip: 3
```

`sequence`-based are [sentence-scoped][1]. See [prose/tagging][2]
for a full list of supported part-of-speech tags.

[1]: /docs/scopes
[2]: https://github.com/jdkato/prose?tab=readme-ov-file#tagging
