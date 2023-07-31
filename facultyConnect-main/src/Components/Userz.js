export const Userz=(props)=>{

    return(<h1 id="nl" style={{backgroundColor: props.completed ? "green":"aqua"}}>{props.uname}
    <br/>
    <button id="j" onClick={()=>props.colorchange(props.id)}>done</button><button id="j" onClick={()=>props.deletetask(props.id)}>x</button></h1>
    );
}