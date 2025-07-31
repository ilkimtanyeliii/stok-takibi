 let urunler = JSON.parse(localStorage.getItem("urunler")) || [];

function kaydet() {
  localStorage.setItem("urunler", JSON.stringify(urunler));
}

function tabloyuGuncelle() {
  const liste = document.getElementById("urunListesi");
  liste.innerHTML = "";
  urunler.forEach((urun, index) => {
    const satir = document.createElement("tr");

    if (urun.adet == 0) {
      satir.classList.add("no-stock");
    } else if (urun.adet < 5) {
      satir.classList.add("low-stock");
    }

    satir.innerHTML = `
      <td>${index + 1}</td>
      <td>${urun.ad}</td>
      <td>${urun.adet}</td>
      <td>${urun.adet === 0 ? "Stok yok" : urun.adet < 5 ? "Az stok" : "Yeterli"}</td>
      <td>
        <button class="edit" onclick="duzenle(${index})">Düzenle</button>
        <button class="delete" onclick="sil(${index})">Sil</button>
      </td>
    `;
    liste.appendChild(satir);
  });
}

function sil(index) {
  if (confirm("Ürünü silmek istediğinize emin misiniz?")) {
    urunler.splice(index, 1);
    kaydet();
    tabloyuGuncelle();
  }
}

function duzenle(index) {
  const yeniAd = prompt("Yeni ürün adı:", urunler[index].ad);
  const yeniAdet = prompt("Yeni adet:", urunler[index].adet);
  if (yeniAd !== null && yeniAdet !== null) {
    urunler[index].ad = yeniAd;
    urunler[index].adet = parseInt(yeniAdet);
    kaydet();
    tabloyuGuncelle();
  }
}

document.getElementById("stokForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const ad = document.getElementById("urunAdi").value;
  const adet = parseInt(document.getElementById("urunAdedi").value);

  urunler.push({ ad, adet });
  kaydet();
  tabloyuGuncelle();

  this.reset();
});

document.getElementById("search").addEventListener("input", function () {
  const aranacak = this.value.toLowerCase();
  const satirlar = document.querySelectorAll("#urunListesi tr");
  satirlar.forEach(satir => {
    const urunAdi = satir.children[1].textContent.toLowerCase();
    satir.style.display = urunAdi.includes(aranacak) ? "" : "none";
  });
});

tabloyuGuncelle();
