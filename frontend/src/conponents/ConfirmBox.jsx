
















const ConfirmBox = ({message,onDelete,onCancel}) => {
  return (
    <section style={{
      position:"fixed",
      top:"0",
      left:"0",
      right:"0",
      bottom:"0",
      backgroundColor:"rgba(0,0,0,0.5)"
    }}>
      <article style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        position:"absolute",
        top:"50%",
        transform: "translate(50%,-50%)",
        backgroundColor:"white",
        padding: "50px",

      }}>
        <h3 style={{color:"#111"}}>{message}</h3>
         <aside style={{
           display:"flex",
           alignItems:"center",
           color:"white",
         }}>
          <button onClick={()=>onDelete(true)} style={{background:"green", padding:"0.5rem",marginRight:"4px", cursor:"pointer"}}>Confirmer</button>
          <button onClick={()=>onCancel(false)} style={{background:"red",padding:"0.5rem", marginLeft:"4px", cursor:"pointer"}}>Annuler</button>
         </aside>
      </article>
      
    </section>
  );
};

export default ConfirmBox;