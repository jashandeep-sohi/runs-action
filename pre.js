import * as core from '@actions/core'
import * as exec from '@actions/exec'

const preCommand = core.getInput("pre-command", { required: true })
const preArgs = core.getMultilineInput("pre-args", { required: true })
const preRun = core.getInput("pre-run", { required: false })

try {
  await exec.exec(
    preCommand,
    [...preArgs, ...[preRun].filter(x => x)],
    {
      listeners: {
        debug: data => core.debug(data),
      },
    }
  )
} catch (error) {
  core.setFailed(`${error}`)
}
