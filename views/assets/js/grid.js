let poly1 = new SVG('polygon').size('100%', '100%').polygon().draw();

let isDrawing = -1;

document.getElementById('polygon').addEventListener("mousedown", (e) => {
    isDrawing = 0;
});

document.getElementById('polygon').addEventListener("mousemove", (e) => {
    if (!isDrawing) {
        poly1.draw(e, 'point');
        isDrawing = 5;
    } else if (isDrawing > 0) {
        isDrawing--;
    }
});

document.getElementById('polygon').addEventListener("mouseup", (e) => {
    poly1.draw('done');
    isDrawing = -1;
    swal.fire({
        title: "Tunnel vision",
        text: "Do you want to save this tunnel vision?",
        icon: "info",
        cancelButtonText: "No, Redraw",
        showCancelButton: true,
        confirmButtonText: "Yes, Save",
        reverseButtons: true,
        cancelButtonColor: "#d33",
    }).then((willSave) => {
        if (willSave.isConfirmed) {

            // send the data to the background script
            chrome.runtime.sendMessage({
                action: 'saveTunnelVision',
                data: {
                    points: poly1.array().value,
                    visionWidth: poly1.width(),
                    visionHeight: poly1.height(),
                    date: new Date(),
                }
            }).then((response) => {
                if (response.success) {
                    swal.fire({
                        title: "Tunnel vision saved",
                        text: "You can view it in the grid",
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#3085d6",
                    })
                }
            });
            swal.fire({
                title: "Tunnel vision is being saved",
                text: "Please wait...",
                icon: "success",
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    swal.showLoading();
                },
            }).then(() => {
            });
        }else{
            location.reload();
        }
    });
});
