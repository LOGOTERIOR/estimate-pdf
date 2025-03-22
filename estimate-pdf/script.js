
document.getElementById("estimateForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const company = document.getElementById("companyName").value.trim();
  const service = document.querySelector('input[name="service"]:checked').value;
  const date = new Date().toISOString().split("T")[0];
  const filename = `pdf/${service}.pdf`;

  fetch(filename)
    .then((res) => res.blob())
    .then((blob) => blob.text())
    .then((text) => {
      const replaced = text.replace(/\{\{상호명\}\}/g, company).replace(/\{\{날짜\}\}/g, date);
      const blob = new Blob([replaced], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${service}_${company}_${date}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    });
});
