package org.jhipster.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.jhipster.blog.domain.enumeration.ProFarmType;
import org.jhipster.blog.domain.enumeration.ProSubType;

/**
 * A ProtectedFarm.
 */
@Entity
@Table(name = "protected_farm")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProtectedFarm implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "protected_farm_id")
    private UUID protectedFarmID;

    @Column(name = "protected_farm_name")
    private String protectedFarmName;

    @Enumerated(EnumType.STRING)
    @Column(name = "protected_farm_type")
    private ProFarmType protectedFarmType;

    @Enumerated(EnumType.STRING)
    @Column(name = "protected_farm_sub_type")
    private ProSubType protectedFarmSubType;

    @Column(name = "protected_farm_description")
    private String protectedFarmDescription;

    @OneToMany(mappedBy = "protectedFarm")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "protectedFarm" }, allowSetters = true)
    private Set<Zone> zones = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "protectedFarms" }, allowSetters = true)
    private Farm farm;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ProtectedFarm id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getProtectedFarmID() {
        return this.protectedFarmID;
    }

    public ProtectedFarm protectedFarmID(UUID protectedFarmID) {
        this.setProtectedFarmID(protectedFarmID);
        return this;
    }

    public void setProtectedFarmID(UUID protectedFarmID) {
        this.protectedFarmID = protectedFarmID;
    }

    public String getProtectedFarmName() {
        return this.protectedFarmName;
    }

    public ProtectedFarm protectedFarmName(String protectedFarmName) {
        this.setProtectedFarmName(protectedFarmName);
        return this;
    }

    public void setProtectedFarmName(String protectedFarmName) {
        this.protectedFarmName = protectedFarmName;
    }

    public ProFarmType getProtectedFarmType() {
        return this.protectedFarmType;
    }

    public ProtectedFarm protectedFarmType(ProFarmType protectedFarmType) {
        this.setProtectedFarmType(protectedFarmType);
        return this;
    }

    public void setProtectedFarmType(ProFarmType protectedFarmType) {
        this.protectedFarmType = protectedFarmType;
    }

    public ProSubType getProtectedFarmSubType() {
        return this.protectedFarmSubType;
    }

    public ProtectedFarm protectedFarmSubType(ProSubType protectedFarmSubType) {
        this.setProtectedFarmSubType(protectedFarmSubType);
        return this;
    }

    public void setProtectedFarmSubType(ProSubType protectedFarmSubType) {
        this.protectedFarmSubType = protectedFarmSubType;
    }

    public String getProtectedFarmDescription() {
        return this.protectedFarmDescription;
    }

    public ProtectedFarm protectedFarmDescription(String protectedFarmDescription) {
        this.setProtectedFarmDescription(protectedFarmDescription);
        return this;
    }

    public void setProtectedFarmDescription(String protectedFarmDescription) {
        this.protectedFarmDescription = protectedFarmDescription;
    }

    public Set<Zone> getZones() {
        return this.zones;
    }

    public void setZones(Set<Zone> zones) {
        if (this.zones != null) {
            this.zones.forEach(i -> i.setProtectedFarm(null));
        }
        if (zones != null) {
            zones.forEach(i -> i.setProtectedFarm(this));
        }
        this.zones = zones;
    }

    public ProtectedFarm zones(Set<Zone> zones) {
        this.setZones(zones);
        return this;
    }

    public ProtectedFarm addZone(Zone zone) {
        this.zones.add(zone);
        zone.setProtectedFarm(this);
        return this;
    }

    public ProtectedFarm removeZone(Zone zone) {
        this.zones.remove(zone);
        zone.setProtectedFarm(null);
        return this;
    }

    public Farm getFarm() {
        return this.farm;
    }

    public void setFarm(Farm farm) {
        this.farm = farm;
    }

    public ProtectedFarm farm(Farm farm) {
        this.setFarm(farm);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProtectedFarm)) {
            return false;
        }
        return id != null && id.equals(((ProtectedFarm) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProtectedFarm{" +
            "id=" + getId() +
            ", protectedFarmID='" + getProtectedFarmID() + "'" +
            ", protectedFarmName='" + getProtectedFarmName() + "'" +
            ", protectedFarmType='" + getProtectedFarmType() + "'" +
            ", protectedFarmSubType='" + getProtectedFarmSubType() + "'" +
            ", protectedFarmDescription='" + getProtectedFarmDescription() + "'" +
            "}";
    }
}
