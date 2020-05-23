import React, {Fragment, useEffect, useState, useCallback, useMemo} from 'react';
import axios from 'axios';

//Container
function App3(props) {
    const [music, setMusic] = useState([]);
    const [ss,setSs] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3000/music.json')
        .then((res)=>{
            setMusic(res.data);
        })
    },[])

    return (
        <div className={"row"}>
            <H/>
            <div style={{"height":"30px"}}></div>
            <SearchBar/>
            <MusicTable music={music} ss={ss}/>
        </div>
    );
}
/*
    var s = "abcdefg";
    var n = s.indexOf("k"); // n은 -1
 */
function MusicTable(props) {
    let rows = [];
    props.music.map((m, index)=>{
        if(m.title.indexOf(props.ss) == -1) return;
        rows.push(<MusicRow key={index} music={m}/>);
    })
    return(
        <table className={"table"}>
            <thead>
                <tr className={"danger"}>
                    <th>순위</th>
                    <th></th>
                    <th>노래명</th>
                    <th>가수명</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

function MusicRow(props) {
    return(
        <tr>
            <td>{props.music.rank}</td>
            <td><img src={props.music.poster} width={"30"} height={"30"}/></td>
            <td>{props.music.title}</td>
            <td>{props.music.singer}</td>
        </tr>
    )
}

function SearchBar() {
    //useCallback
    return(
        <table className={"table"}>
            <tr>
                <td>
                    <input type={"text"} size={"25"} className={"input-sm"} placeholder={"Search"}/>
                </td>
            </tr>
        </table>
    )
}
const H=()=>{
    //Memo
    return (
        <h1 className={"text-center"}>Music Top 50</h1>
    )
}

const H2=()=>{
    return(
        <div></div>
    )
}
export default App3;