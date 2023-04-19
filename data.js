const displayTable = async () => {
  const r = await fetch("http://localhost:5000");
    const d = await r.json();
    console.log(d);

  const renderTable = (d) => {
    const tbody = document.getElementsByClassName("tbody")[0];
    let temp = "";
    d.forEach((item, i) => {
      temp += `
            <tr>
                <td>${i + 1}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.mobile}</td>
                <td>${item.gender}</td>
                <td>${item.dob}</td>
                <td>${item.age}</td>
                <td>${item.qualification}</td>
                <td>${item.currexp}</td>
                <td>${item.pastexp}</td>
                <td>${item.doj}</td>
            </tr>
        `;
    });
    tbody.innerHTML = temp;
  };
  renderTable(d);
};

displayTable();
