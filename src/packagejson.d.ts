declare module 'packageJson' {
    declare const pkgJson: {
        name: string;
        version: string;
        peerDependencies: Record<string, any>;
        [x: string]: any;
    };
    export default pkgJson;
}
