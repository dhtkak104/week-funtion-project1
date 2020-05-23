import React, {Fragment, useEffect, useState, useCallback, useMemo} from 'react';
import axios from 'axios';
/*
    Callback: 함수의 주소를 기억
    Memo : 함수의 리턴형을 기억
 */

//Container
function App3(props) {
    const [music, setMusic] = useState([]);
    const [ss,setSs] = useState("");

    useEffect(()=>{
        axios.get('http://localhost:3000/music.json')
        .then((res)=>{
            setMusic(res.data);
        })
    },[])

    const handleUserInput = useCallback((ss) => {
        setSs(ss);
    },[ss]) // ss가 변경될 때만 callback 함수가 실행되도록 처리
    return (
        <div className={"row"}>
            <H/>
            <H2/>
            <div style={{"height":"30px"}}></div>
            <SearchBar ss={ss} onUserInput={handleUserInput}/>
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
        if((m.title.indexOf(props.ss) == -1) && (m.singer.indexOf(props.ss) == -1)) return;
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

function SearchBar(props) {
    const handleChange = (e) => {
        props.onUserInput(e.target.value);
    }
    //useCallback
    return(
        <table className={"table"}>
            <tr>
                <td>
                    <input
                        type={"text"}
                        size={"25"}
                        className={"input-sm"}
                        placeholder={"Search"}
                        value={props.ss}
                        onChange={handleChange}
                    />
                </td>
            </tr>
        </table>
    )
}
const H=()=>{
    const colors = ["red","blue","green","yellow","pink"];
    const no = parseInt(Math.random()*5);
    return (
        <h1 className={"text-center"} style={{"color":colors[no]}}>Music Top 50</h1>
    )
}

const H2=React.memo(()=>{
    //Memo
    const colors = ["red","blue","green","yellow","pink"];
    const no = parseInt(Math.random()*5);
    return (
        <h1 className={"text-center"} style={{"color":colors[no]}}>Music Top 50</h1>
    )
});
export default App3;