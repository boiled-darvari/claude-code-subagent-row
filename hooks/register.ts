import type { Register } from 'claude-code'

// Each row of the agent list, drawn as
//   name · description · model[/effort] · N tok
// It stands in for a command script behind the deprecated `subagentStatusLine`
// setting: the name falls back to the agent type, and the model reads
// "resolving" until the engine knows it.
export const register: Register = on => {
  on('ui.render', { component: 'AgentRow' }, ($, e, next) => {
    const { name, type, description, model, effort, tokenCount } = e.props
    const body = [
      name ?? type ?? 'agent',
      description,
      (model ?? 'resolving') + (effort === undefined ? '' : `/${effort}`),
      `${tokenCount ?? 0} tok`,
    ].join(' · ')

    return next({ ...e, props: { ...e.props, body } })
  })
}
