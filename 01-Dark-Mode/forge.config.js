const {FusesPlugin} = require('@electron-forge/plugin-fuses');
const {FuseV1Options, FuseVersion} = require('@electron/fuses');
const path = require('node:path')
let icoPath = path.join(__dirname, '../public/qe.ico')

module.exports = {
    packagerConfig: {
        asar: true,
        name: 'dark-mode',
        icon: path.join(__dirname, '../public/qe.ico'),
        setupIcon: path.join(__dirname, '../public/qe.ico'),
        win:{
            target: [
                {
                    target: 'nsis',
                    arch: [
                        'x64',
                    ],
                    options: {
                        perMachine: true,
                        allowToChangeInstallationDirectory: true,
                        createDesktopShortcut: true,
                        deleteAppDataOnUninstall: true,
                        defaultInstallLocation: '$PROGRAMFILES', // 设置默认安装路径
                    }
                },
            ],
        }
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'dark-mode',
                icon: icoPath,
                setupIcon: icoPath
            },
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {},
        },
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
};
