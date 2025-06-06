window.addEventListener('DOMContentLoaded', function () {
    const btnPedir = document.getElementById('btnPedir');
    const inputDragonBall = document.getElementById('numeroDragonBall');
    const imgDragonBall = document.getElementById('imagenDragonBall');
    const divInfo = document.getElementById('infoDragonBall');
    const descripcion = document.getElementById('descripcionDragonBall');
  
    const btnListar = document.getElementById('btnListar');
    const selector = document.getElementById('selectorPersonajes');
  
    const btnBuscarRaza = document.getElementById('btnBuscarRaza');
    const inputRaza = document.getElementById('inputRaza');
    const resultadosRaza = document.getElementById('resultadosRaza');
  
    // Buscar por ID
    btnPedir.addEventListener('click', () => {
      const id = inputDragonBall.value.trim();
      if (id) {
        fetch(`https://dragonball-api.com/api/characters/${id}`)
          .then(res => {
            if (!res.ok) throw new Error('No encontrado');
            return res.json();
          })
          .then(data => mostrarPersonaje(data))
          .catch(err => {
            limpiarVista();
            console.error(err.message);
          });
      }
    });
  
    function mostrarPersonaje(data) {
      imgDragonBall.src = data.image;
      divInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Raza:</strong> ${data.race}</p>
        <p><strong>Género:</strong> ${data.gender}</p>
        <p><strong>Ki:</strong> ${data.ki} / ${data.maxKi}</p>
      `;
      descripcion.innerHTML = `<p><strong>Descripción:</strong> ${data.description}</p>`;
    }
  
    function limpiarVista() {
      imgDragonBall.src = "";
      divInfo.innerHTML = "";
      descripcion.innerHTML = "";
    }
  
    // Listar primeros 10
    btnListar.addEventListener('click', () => {
      fetch("https://dragonball-api.com/api/characters?limit=10")
        .then(res => res.json())
        .then(data => {
          selector.innerHTML = `<option value="">Selecciona un personaje</option>`;
          data.items.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = p.name;
            selector.appendChild(option);
          });
        });
    });
  
    selector.addEventListener('change', () => {
      const id = selector.value;
      if (id) {
        fetch(`https://dragonball-api.com/api/characters/${id}`)
          .then(res => res.json())
          .then(data => mostrarPersonaje(data));
      }
    });
  
    // Buscar por raza
    btnBuscarRaza.addEventListener('click', () => {
      const razaBuscada = inputRaza.value.toLowerCase();
      if (!razaBuscada) return;
  
      fetch(`https://dragonball-api.com/api/characters?limit=150`)
        .then(res => res.json())
        .then(data => {
          const filtrados = data.items.filter(p => 
            p.race && p.race.toLowerCase().includes(razaBuscada)
          );
  
          if (filtrados.length === 0) {
            resultadosRaza.innerHTML = "<p>No se encontraron personajes con esa raza.</p>";
          } else {
            resultadosRaza.innerHTML = filtrados.map(p => `
              <p><strong>${p.name}</strong> - ${p.race}</p>
            `).join("");
          }
        });
    });
  });
  