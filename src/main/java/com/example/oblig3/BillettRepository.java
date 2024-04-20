package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBillett(Billett innBillett) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) " +
                "VALUES (?,?,?,?,?,?)";
        db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(),
                innBillett.getEtternavn(), innBillett.getTelefonnr(), innBillett.getEpost());
    }

    public List<Billett> hentBillett() {
        String sql = "SELECT * FROM Billett ORDER BY etternavn";
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
        return alleBilletter;
    }

    public void slettBilletter() {
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
