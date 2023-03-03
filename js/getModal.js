var modalWrap = null;

const showModal = (title, img, price) => {

  console.log(title)
  modalWrap = document.createElement('div');
  modalWrap.innerHTML = /*html*/ `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Book details</h5>
          </div>
          <div class="modal-body">
            <p><span>Title: </span>${title}</p>
            <img class="descriptionImage img-fluid" src="${img}" alt="Responsive image">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closeModal();">Close</button>
            <button type="button" class="btn btn-success" onclick="addBookToCart('${title}', '${price}', '${img}');">Buy book</button>
          </div>
        </div>
      </div>
    </div>
    `;

  document.body.append(modalWrap);

  modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();

}

function closeModal() {
  modal.hide();
}

