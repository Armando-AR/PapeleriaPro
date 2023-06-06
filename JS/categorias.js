function generarNumero() {
    var randomId = Math.floor(Math.random() * 900000) + 100000; // Generar un número aleatorio de 6 cifras
    document.getElementById('categoriaId').value = randomId; // Asignar el número aleatorio al campo ID_Categoría
  }