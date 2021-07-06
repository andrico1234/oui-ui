var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')

var packages = resolve(__dirname, '../packages/')

const scriptName = process.argv[2]

console.info('Generating web component manifests...')

if (!scriptName) {
    console.error('-- Please pass through the script to run --')
    process.exit(1)
}

fs.readdirSync(packages).forEach(function (package) {
    var packagePath = join(packages, package)

    if (!fs.existsSync(join(packagePath, 'package.json'))) {
        return
    }

    const pkgJsonContents = JSON.parse(
        fs.readFileSync(`${packagePath}/package.json`, 'utf8')
    )

    const scripts = pkgJsonContents.scripts || {}

    if (!scripts[scriptName]) {
        return
    }

    cp.spawnSync('yarn', [scriptName], {
        env: process.env,
        cwd: packagePath,
    })
})

process.exit(0)
