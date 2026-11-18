import { expect, test } from 'claude-code/testing'

const ROW = {
  plugin: 'subagent-row',
  component: 'AgentRow',
  requestId: 'a1',
} as const

const AGENT = {
  id: 'a1',
  description: 'Find the bug',
  type: 'general-purpose',
  status: 'running' as const,
  kind: 'local_agent' as const,
  taskStatus: 'running' as const,
  label: 'Find the bug',
  startTime: 0,
  cwd: '/',
  tokenCount: 12345,
  tokenSamples: [12345],
  hasRow: true,
  rowIds: ['a1'],
  isHidden: false,
}

test('a row reads name, description, model/effort and tokens', async ($, on) => {
  // Stands for the engine: draws the body the mod passed down.
  on('ui.render', { component: 'AgentRow' }, ($, e) => {
    const { Text } = $.ui.resolve(e)

    return <Text>{e.props.body ?? 'engine columns'}</Text>
  })

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({
      ...ROW,
      surface,
      props: {
        ...AGENT,
        name: 'researcher',
        model: 'claude-fable-5-2',
        effort: 'high',
      },
    })

    expect((await ui.find({ type: 'Text' }))?.text).toBe(
      'researcher · Find the bug · claude-fable-5-2/high · 12345 tok',
    )
    await ui.unmount()
  }
})

test('no name, model or effort: the type, "resolving", no effort', async ($, on) => {
  on('ui.render', { component: 'AgentRow' }, ($, e) => {
    const { Text } = $.ui.resolve(e)

    return <Text>{e.props.body ?? 'engine columns'}</Text>
  })

  const ui = await $.ui.mount({
    ...ROW,
    surface: 'terminal',
    props: { ...AGENT, type: 'Explore', description: 'Search repo', tokenCount: 0 },
  })

  expect((await ui.find({ type: 'Text' }))?.text).toBe(
    'Explore · Search repo · resolving · 0 tok',
  )
  await ui.unmount()
})
