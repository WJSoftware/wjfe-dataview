declare module 'packageLockJson' {
    declare const pkgLockJson: {
        packages: {
            [x: `node_modules/${string}`]: {
                version: string;
            }
        }
    };
    export default pkgLockJson;
}
