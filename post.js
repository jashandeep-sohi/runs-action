import * as core from '@actions/core'
import * as exec from '@actions/exec'

const postCommand = core.getInput("post-command", { required: true })
const postArgs = core.getMultilineInput("post-args", { required: true })
const postRun = core.getInput("post-run", { required: false })

try {
  await exec.exec(
    postCommand,
    [...postArgs, ...[postRun].filter(x => x)],
    {
      listeners: {
        debug: data => core.debug(data),
      },
    }
  )
} catch (error) {
  core.setFailed(`${error}`)
}
