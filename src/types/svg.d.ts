declare module "*.svg" {
    import * as React from "react"
    const C: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>
    export default C
}
declare module "*.svg?url" {
    const src: string
    export default src
}
