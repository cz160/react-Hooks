import React from 'react';
import useSelection from '../hooks/useSelection';

const list = [0,1,2,3,4]
const UseSelection = ()=>{
    const {
        isSelected,
        toggle,
        selectd,
        isAllSelected,
        toggleAll
    } = useSelection(list,[]);
    return (
        <>
            <ul>
                {
                    list.map(item=>(
                        <li onClick={()=>{
                            toggle(item)
                        }}>
                            <input type="checkbox" checked={isSelected(item)} />
                            {item}
                        </li>
                    ))
                }
            </ul>
            全选<input type="checkbox" checked={isAllSelected} onClick={toggleAll}/>
            <div>当前选择：{ selectd.join(',') }</div>
        </>
        
    )
}
export default UseSelection;