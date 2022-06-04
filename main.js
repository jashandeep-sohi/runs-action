import * as core from '@actions/core'
import * as exec from '@actions/exec'

const mainCommand = core.getInput("main-command", { required: true })
const mainArgs = core.getMultilineInput("main-args", { required: true })
const mainRun = core.getInput("main-run", { required: false })

try {
  const retCode = await exec.exec(
    mainCommand,
    [...mainArgs, ...[mainRun].filter(x => x)],
    {
      listeners: {
        stdout: data => process.stdout.write(data),
        stderr: data => process.stderr.write(data),
        debug: data => core.debug(data),
      },
      ignoreReturnCode: true,
    }
  )
  core.setOutput("return-code", retCode)

  if (retCode !== 0)
    core.setFailed(`${mainCommand} failed with exit code ${retCode}`)
} catch (error) {
  core.setFailed(`{error}`)
}
