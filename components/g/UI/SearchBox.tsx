import { useEffect } from "react"
import { GCtx } from "../../../g/GCtx"
import { guitarChords, ukuleleChords } from "../../../lib/chords"

const getChords = (instrument: 'guitar' | 'ukulele') => instrument === 'guitar' ? guitarChords : ukuleleChords

export const SearchBox: React.FC<{
    gctx: GCtx
}> = (props) => {

    useEffect(() => {

        setTimeout(() => {
            search(props.gctx)
            props.gctx.render()
        }, 0)
    }, [])

    return <div className="max-w-sm mx-auto">
        <input
            className="mb-4 w-full p-2 px-5 rounded-full border-gray border-2"
            type="text"
            value={props.gctx.state.q}
            placeholder={"和弦搜尋"}
            onChange={e => {
                props.gctx.state.q = e.target.value
                search(props.gctx)
                props.gctx.render()
            }}
        />
    </div>
}

export function search(gctx: GCtx) {
    const results = getChords(gctx.state.instrument).search(gctx.state.q)
    gctx.state.chords = results.slice(0, 10)
}