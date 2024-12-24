---
title: Code
description: Learn how Vale handles source code.
---

<script lang="ts">
    import CodeFormats from '$lib/components/docs/CodeFormats.svelte';
</script>

Vale supports linting source code comments in a number of languages
(see below).

<CodeFormats />

## Associations

In many languages, it's common for comments to contain _embedded markup_ (e.g., Markdown, reStructuredText, etc.) within them. For example, consider the following Rust doc comment:

````rust
impl Person {
    /// Creates a person with the given name.
    ///
    /// # Examples
    ///
    /// ```
    /// // You can have rust code between fences
    /// // inside the comments If you pass --test
    /// // to `rustdoc`, it will even test it for
    /// // you!
    /// use doc::Person;
    /// let person = Person::new("name");
    /// ```
    pub fn new(name: &str) -> Person {
        Person {
            name: name.to_string(),
        }
    }
}
````

If the embedded markup is one of the supported formats, you can
associate the `comment` scope with a `markup` type. This will allow you to
lint the embedded markup as if it were a standalone file.

```ini
StylesPath = styles
MinAlertLevel = suggestion

[formats]
# Rust + Markdown
rs = md

[*.{rs,md}]
BasedOnStyles = Vale
```

Once a markup format has been assigned, you can make use of all the
supported features of that format (such as ignore patterns and comment-based
configuration) in your source code comments.
