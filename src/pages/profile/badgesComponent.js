/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useGetBadgesQuery } from "store/api/QuestAPISlice"

// import {ReactComponent as Badge1} from 'path to badge 1'

const svgContext = require.context('./Images', false, /\.svg$/);
const svgs = svgContext.keys().map(svgContext);

const BadgeComponent = ({ small = false, id = null }) => {
    const tierList = { 0: 'Bronze', 1: 'Silver', 2: 'Gold', 3: 'Diamond' }
    const { data, isLoading } = useGetBadgesQuery(id)
    useEffect(() => { },
        [data])

    const mdata = (data || []).map((x) => ({ ...x, ref: x.ref.replace(x.ref[x.ref.length - 1], tierList[x.ref[x.ref.length - 1]]) })).filter((elem) => !elem.ref.includes('Generics'))
    // const arr = { "m1": "badge 1", "m2": "badge 2", "m3": "badge 3" }
    if (isLoading)
        return (
            <div>
                loading
            </div>
        )
    return (
        <>
            {!small && <h1>Badges: {data.filter(x => x.cleared)?.length || 'None'}</h1>}
            <div className={`tw-flex tw-gap-4 tw-flex-row tw-max-w-[820px] ${!small ? ' tw-overflow-x-scroll tw-shadow-sm tw-p-3' : ''}`}>
                {(mdata ?? []).filter((x, i) => id ? i < 4 && x.cleared : true).length < 1 && <div className="tw-text-[8px]">
                    No badges
                </div>}
                {(mdata ?? []).filter((x, i) => id ? i < 4 && x.cleared : true).sort((a, b) => b.currentProgress - ((a.cleared * 9999) + a.currentProgress)).map((x, i) =>
                    <>
                        {/*put image in place of the div below 
                                1-make a json with keys being the refs of the categories and values being the image paths or svg components 
                                as shown below and above in line 3 and call it as shown below (line 26) in case of svg component
                                
                                2-use the (x?.ref||'') as the key to get the image path or svg component from the json

                                3- this component is called in the profile page and the badges are shown when cleared to test it remove the filter from above (twice)
                                */}



                        <div>
                            <div key={i} style={!x.cleared ? { filter: 'saturate(0.1)' } : {}} className={`${small ? 'tw-w-4 tw-h-4' : 'tw-w-[130px]'} tw-flex tw-justify-center tw-items-center`}>
                                {/* {arr[(x?.ref||'')]} */}
                                <img width={'130px'} src={svgs.find((y) => y.includes(x.ref))} alt="Badge" />
                            </div>
                            {!small && <div >
                                {(x?.ref || '')}
                            </div >}
                            {!small && <div >
                                {x.currentProgress}/{x.goal}
                            </div >}
                        </div>
                    </>
                )}
            </div >
        </>
    )
}

export default BadgeComponent