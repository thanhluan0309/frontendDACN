export const itemPost = ({ Post }) => {
  const Loopitem = () => {
    for (let index = 0; index < Post.length; index++) {
        <li className="body-item">{Post[index].title}</li>
    }
  }  
  return (
    <>
      <ul className="body-Listitem">
        <Loopitem></Loopitem>
      </ul>
    </>
  );
};
