package org.jhipster.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.UUID;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.jhipster.blog.domain.enumeration.ZoneType;

/**
 * A Zone.
 */
@Entity
@Table(name = "zone")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Zone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "zone_id")
    private UUID zoneID;

    @Enumerated(EnumType.STRING)
    @Column(name = "zone_type")
    private ZoneType zoneType;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "protected_fid")
    private UUID protectedFID;

    @ManyToOne
    @JsonIgnoreProperties(value = { "zones", "farm" }, allowSetters = true)
    private ProtectedFarm protectedFarm;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Zone id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getZoneID() {
        return this.zoneID;
    }

    public Zone zoneID(UUID zoneID) {
        this.setZoneID(zoneID);
        return this;
    }

    public void setZoneID(UUID zoneID) {
        this.zoneID = zoneID;
    }

    public ZoneType getZoneType() {
        return this.zoneType;
    }

    public Zone zoneType(ZoneType zoneType) {
        this.setZoneType(zoneType);
        return this;
    }

    public void setZoneType(ZoneType zoneType) {
        this.zoneType = zoneType;
    }

    public String getManufacturer() {
        return this.manufacturer;
    }

    public Zone manufacturer(String manufacturer) {
        this.setManufacturer(manufacturer);
        return this;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public UUID getProtectedFID() {
        return this.protectedFID;
    }

    public Zone protectedFID(UUID protectedFID) {
        this.setProtectedFID(protectedFID);
        return this;
    }

    public void setProtectedFID(UUID protectedFID) {
        this.protectedFID = protectedFID;
    }

    public ProtectedFarm getProtectedFarm() {
        return this.protectedFarm;
    }

    public void setProtectedFarm(ProtectedFarm protectedFarm) {
        this.protectedFarm = protectedFarm;
    }

    public Zone protectedFarm(ProtectedFarm protectedFarm) {
        this.setProtectedFarm(protectedFarm);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Zone)) {
            return false;
        }
        return id != null && id.equals(((Zone) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Zone{" +
            "id=" + getId() +
            ", zoneID='" + getZoneID() + "'" +
            ", zoneType='" + getZoneType() + "'" +
            ", manufacturer='" + getManufacturer() + "'" +
            ", protectedFID='" + getProtectedFID() + "'" +
            "}";
    }
}
