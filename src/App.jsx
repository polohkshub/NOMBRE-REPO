  return (
    <div className="app-wrapper">
      <header className="header">
        <div className="logo">💙</div>
        <div className="title-group">
          <h1>Control de Gastos</h1>
          <p>simple • rápido • pensado para vos</p>
        </div>
      </header>

      <main className="main-content">
        {/* INGRESAR GASTO */}
        <section className="card">
          <h2>➕ Ingresar gasto</h2>
          <div className="form-grid">
            <label className="form-field">
              Monto
              <input
                type="number"
                placeholder="1500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>

            <label className="form-field">
              Descripción
              <input
                type="text"
                placeholder="supermercado, nafta..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </label>

            <div className="form-row-double">
              <label className="form-field">
                Categoría
                <select value={cat} onChange={(e) => setCat(e.target.value)}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c.toUpperCase()}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                Fecha
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
            </div>

            <button className="btn primary" onClick={addExpense}>
              Guardar gasto
            </button>
          </div>
        </section>

        {/* RESUMEN */}
        <section className="card">
          <h2>📊 Resumen</h2>

          <div className="date-filters">
            <label>
              Desde
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </label>
            <label>
              Hasta
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </label>
          </div>

          <div className="total-highlight">
            <div className="total-title">Total período</div>
            <div className="total-value">{formatARS(total)}</div>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((c) => (
              <div key={c} className={`category-card ${totalsByCat[c] > 0 ? 'has-value' : ''}`}>
                <div className="cat-label">{c.toUpperCase()}</div>
                <div className="cat-amount">{formatARS(totalsByCat[c])}</div>
              </div>
            ))}
          </div>

          <button className="btn export-btn" onClick={exportResumen}>
            Exportar resumen a Excel
          </button>
        </section>

        {/* LISTA DE GASTOS */}
        <section className="card lista-gastos">
          <h2>🧾 Gastos en el período</h2>

          {filtered.length === 0 ? (
            <p className="no-data">Todavía no hay gastos en este rango 💙</p>
          ) : (
            <div className="expenses-list">
              {filtered
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((it) => (
                  <div key={it.id} className="expense-row">
                    <div className="expense-info">
                      <div className="exp-date">{it.date}</div>
                      <div className="exp-desc">{it.desc || '—'}</div>
                      <div className="exp-cat">{it.category.toUpperCase()}</div>
                    </div>
                    <div className="expense-actions">
                      <div className="exp-monto">{formatARS(it.amount)}</div>
                      <button className="delete-icon" onClick={() => removeExpense(it.id)}>
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="month-actions">
            <button className="btn primary" onClick={saveMonthSnapshot}>
              GUARDAR MES
            </button>
            <button className="btn secondary" onClick={loadMonthSnapshot}>
              CARGAR MES
            </button>
          </div>

          {/* BOTÓN BORRAR TODO – SOLO ACÁ ABAJO */}
          <div className="danger-zone">
            <button className="btn danger large" onClick={clearAll}>
              Borrar TODOS los gastos
            </button>
          </div>

          <footer className="app-footer">
            Hecho con mucho amor para Lore 💙✨
          </footer>
        </section>
      </main>
    </div>
  );
