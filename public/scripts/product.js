var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dvikyto7j/upload';
var CLOUDINARY_UPLOAD_PRESET = 'products_dir';

var fileUpload = document.getElementById('file-upload');
var previewAvatar = document.getElementById('preview-avatar');
var btnSubmit = document.getElementById('submit-form');
var productForm = document.getElementById('product-form');
var deleteAvatar = document.getElementById('delete-avatar');
var public_id = "";
var image = "";

fileUpload.addEventListener('change', function(event) {
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    btnSubmit.disabled = true;

    axios({
        url: CLOUDINARY_URL,
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data: formData
    }).then(function(res) {
        console.log(res);
        previewAvatar.src = res.data.secure_url;
        public_id = res.data.public_id;
        image = res.data.secure_url;
        btnSubmit.disabled = false;
    }).catch(function(err) {
        console.log(err);
    })

});

productForm.addEventListener('submit', function() {
    var input = document.createElement('input');
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "image");
    input.setAttribute("value", image);
    productForm.appendChild(input);
    return true;
});