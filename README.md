# subagent-row

A Claude Code mod that draws each row of the agent list (the running subagents
shown under the prompt) as one compact line:

```
name · description · model[/effort] · N tok
```

For example:

```
researcher · Find the bug · claude-fable-5-2/high · 12345 tok
Explore · Search repo · resolving · 0 tok
```

- **name**: the agent's name, or its type when it has none.
- **description**: the short task description the agent was started with.
- **model**: the model the agent runs on; reads `resolving` until that is known.
  `/effort` is added only when the agent has an effort of its own.
- **N tok**: the tokens the agent has used so far.

It replaces a `subagentStatusLine` command in `settings.json`, which Claude Code
has deprecated in favor of mods. Once the mod is installed you can remove that
setting.

## Install

At the prompt of a terminal session:

```
/plugin install subagent-row --marketplace boiled-darvari/claude-code-subagent-row
```

From a shell:

```
claude plugin install subagent-row --marketplace boiled-darvari/claude-code-subagent-row
```

In the desktop app, where `/plugin` does not run: click + next to the prompt
box, then Plugins, Add marketplace with `boiled-darvari/claude-code-subagent-row`,
then Add plugin.

## Changing the format

The whole mod is one hook in `hooks/register.ts`. Edit the list it joins to add,
drop or reorder the parts of the row.

## Tests

```
claude plugin test .
```

Written against Claude Code 2.1.327. The mods API is early access and may change
between releases.
