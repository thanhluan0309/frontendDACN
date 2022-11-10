import Button from "react-bootstrap/esm/Button";
export const ModalEdit = ({
  id,
  color,
  onchangeEdit,
  getPostEdit,
  onSubmitEdit,
}) => {
  let gcolor = getPostEdit.color;
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={onchangeEdit}
                    value={getPostEdit.title}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Describtion
                  </label>
                  <input
                    name="Des"
                    type="text"
                    onChange={onchangeEdit}
                    value={getPostEdit.Des}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Url
                  </label>
                  <input
                    name="Url"
                    type="text"
                    onChange={onchangeEdit}
                    value={getPostEdit.Url}
                    placeholder="https://"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Behavior
                  </label>

                  <select
                    value={getPostEdit.Behavior}
                    defaultValue={"DEFAULT"}
                    name="Behavior"
                    className="form-select"
                    onChange={onchangeEdit}
                    aria-label="Default select example"
                  >
                    <option selected value={getPostEdit.Behavior}>
                      You are choose here - {getPostEdit.Behavior}
                    </option>
                    <option value="To-Learning">To-Learning</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Here to change color
                  </label>
                  <input
                    className="form-control"
                    type={"color"}
                    name="color"
                    onChange={onchangeEdit}
                    value={color}
                  ></input>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <Button onClick={onSubmitEdit} className="btn btn-primary">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const ModalAddpost = ({
  onchangeCreate,
  createPost,
  onSubmitCreate,
}) => {
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add new post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={onchangeCreate}
                    value={createPost.title}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Describtion
                  </label>
                  <input
                    name="Des"
                    type="text"
                    onChange={onchangeCreate}
                    value={createPost.Des}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Url
                  </label>
                  <input
                    name="Url"
                    type="text"
                    onChange={onchangeCreate}
                    value={createPost.Url}
                    placeholder="https://"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Behavior
                  </label>
                  <select
                    name="Behavior"
                    className="form-select"
                    onChange={onchangeCreate}
                    aria-label="Default select example"
                  >
                    <option value="To-Learning">To-Learning</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <Button onClick={onSubmitCreate} className="btn btn-primary">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
