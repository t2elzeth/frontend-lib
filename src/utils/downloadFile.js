export async function downloadFile(uri, token, filename) {
    const response = await fetch(uri, {
        method: "GET",
        headers: {
            "Accept": "image/jpeg",
            "Authorization": `Bearer ${token}`
        }
    });

    const blob = await response.blob();

    const windowUrl = window.URL || window.webkitURL;

    const url = windowUrl.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();

    anchor.remove();
}
