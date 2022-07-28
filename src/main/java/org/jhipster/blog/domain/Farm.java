package org.jhipster.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.jhipster.blog.domain.enumeration.FarmType;
import org.jhipster.blog.domain.enumeration.SubType;

/**
 * A Farm.
 */
@Entity
@Table(name = "farm")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Farm implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "farm_id")
    private UUID farmID;

    @Column(name = "pform_id")
    private UUID pformID;

    @Column(name = "farm_name")
    private String farmName;

    @Enumerated(EnumType.STRING)
    @Column(name = "farm_type")
    private FarmType farmType;

    @Enumerated(EnumType.STRING)
    @Column(name = "farm_sub_type")
    private SubType farmSubType;

    @Column(name = "farm_description")
    private String farmDescription;

    @OneToMany(mappedBy = "farm")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zones", "farm" }, allowSetters = true)
    private Set<ProtectedFarm> protectedFarms = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Farm id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getFarmID() {
        return this.farmID;
    }

    public Farm farmID(UUID farmID) {
        this.setFarmID(farmID);
        return this;
    }

    public void setFarmID(UUID farmID) {
        this.farmID = farmID;
    }

    public UUID getPformID() {
        return this.pformID;
    }

    public Farm pformID(UUID pformID) {
        this.setPformID(pformID);
        return this;
    }

    public void setPformID(UUID pformID) {
        this.pformID = pformID;
    }

    public String getFarmName() {
        return this.farmName;
    }

    public Farm farmName(String farmName) {
        this.setFarmName(farmName);
        return this;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public FarmType getFarmType() {
        return this.farmType;
    }

    public Farm farmType(FarmType farmType) {
        this.setFarmType(farmType);
        return this;
    }

    public void setFarmType(FarmType farmType) {
        this.farmType = farmType;
    }

    public SubType getFarmSubType() {
        return this.farmSubType;
    }

    public Farm farmSubType(SubType farmSubType) {
        this.setFarmSubType(farmSubType);
        return this;
    }

    public void setFarmSubType(SubType farmSubType) {
        this.farmSubType = farmSubType;
    }

    public String getFarmDescription() {
        return this.farmDescription;
    }

    public Farm farmDescription(String farmDescription) {
        this.setFarmDescription(farmDescription);
        return this;
    }

    public void setFarmDescription(String farmDescription) {
        this.farmDescription = farmDescription;
    }

    public Set<ProtectedFarm> getProtectedFarms() {
        return this.protectedFarms;
    }

    public void setProtectedFarms(Set<ProtectedFarm> protectedFarms) {
        if (this.protectedFarms != null) {
            this.protectedFarms.forEach(i -> i.setFarm(null));
        }
        if (protectedFarms != null) {
            protectedFarms.forEach(i -> i.setFarm(this));
        }
        this.protectedFarms = protectedFarms;
    }

    public Farm protectedFarms(Set<ProtectedFarm> protectedFarms) {
        this.setProtectedFarms(protectedFarms);
        return this;
    }

    public Farm addProtectedFarm(ProtectedFarm protectedFarm) {
        this.protectedFarms.add(protectedFarm);
        protectedFarm.setFarm(this);
        return this;
    }

    public Farm removeProtectedFarm(ProtectedFarm protectedFarm) {
        this.protectedFarms.remove(protectedFarm);
        protectedFarm.setFarm(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Farm)) {
            return false;
        }
        return id != null && id.equals(((Farm) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Farm{" +
            "id=" + getId() +
            ", farmID='" + getFarmID() + "'" +
            ", pformID='" + getPformID() + "'" +
            ", farmName='" + getFarmName() + "'" +
            ", farmType='" + getFarmType() + "'" +
            ", farmSubType='" + getFarmSubType() + "'" +
            ", farmDescription='" + getFarmDescription() + "'" +
            "}";
    }
}
