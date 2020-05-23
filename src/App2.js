import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App2(props) {
    const [music, setMusic] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/music.json')
            .then((res) => {
                setMusic(res.data);
                console.log(res.data);
            })
    }, [])
    const html = music.map((m, index) =>
        <tr key={index}>
            <td>{m.rank}</td>
            <td>
                {
                    m.state === "상승" &&
                    <span style={{"color": "red"}}>▲{m.idcrement}</span>
                }
                {
                    m.state === "하강" &&
                    <span style={{"color": "blue"}}>▼{m.idcrement}</span>
                }
                {
                    m.state === "유지" &&
                    <span style={{"color": "gray"}}>-</span>
                }
            </td>
            <td><img src={m.poster} width={"35"} height={"35"}/></td>
            <td>{m.title}</td>
            <td>{m.singer}</td>
        </tr>
    )
    return (
        <div className={"row"}>
            <H/>
            <div style={{"height":"30px"}}></div>
            <table className={"table"}>
                <tr>
                    <td>
                        <input type={"text"} className={"input-sm"} width={"25"}/>
                    </td>
                </tr>
            </table>
            <table className={"table"}>
                <thead>
                <tr className={"suceess"}>
                    <td>순위</td>
                    <td>등록</td>
                    <td></td>
                    <td>노래명</td>
                    <td>가수명</td>
                </tr>
                </thead>
                <tbody>
                {html}
                </tbody>
            </table>
        </div>
    );
}
function H(){ //const H=()=>{} 대체가능
    const color=["red","orange","pink","yellow","blue"];
    const no = parseInt(Math.random()*5);
    return (
        <h1 className={"test-center"} style={{"color":color[no]}}>Music Top50</h1>
    )
}
export default App2;
