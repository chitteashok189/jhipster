package org.jhipster.blog.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.jhipster.blog.domain.ProtectedFarm;
import org.jhipster.blog.repository.ProtectedFarmRepository;
import org.jhipster.blog.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.jhipster.blog.domain.ProtectedFarm}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProtectedFarmResource {

    private final Logger log = LoggerFactory.getLogger(ProtectedFarmResource.class);

    private static final String ENTITY_NAME = "protectedFarm";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProtectedFarmRepository protectedFarmRepository;

    public ProtectedFarmResource(ProtectedFarmRepository protectedFarmRepository) {
        this.protectedFarmRepository = protectedFarmRepository;
    }

    /**
     * {@code POST  /protected-farms} : Create a new protectedFarm.
     *
     * @param protectedFarm the protectedFarm to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new protectedFarm, or with status {@code 400 (Bad Request)} if the protectedFarm has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/protected-farms")
    public ResponseEntity<ProtectedFarm> createProtectedFarm(@RequestBody ProtectedFarm protectedFarm) throws URISyntaxException {
        log.debug("REST request to save ProtectedFarm : {}", protectedFarm);
        if (protectedFarm.getId() != null) {
            throw new BadRequestAlertException("A new protectedFarm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProtectedFarm result = protectedFarmRepository.save(protectedFarm);
        return ResponseEntity
            .created(new URI("/api/protected-farms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /protected-farms/:id} : Updates an existing protectedFarm.
     *
     * @param id the id of the protectedFarm to save.
     * @param protectedFarm the protectedFarm to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated protectedFarm,
     * or with status {@code 400 (Bad Request)} if the protectedFarm is not valid,
     * or with status {@code 500 (Internal Server Error)} if the protectedFarm couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/protected-farms/{id}")
    public ResponseEntity<ProtectedFarm> updateProtectedFarm(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProtectedFarm protectedFarm
    ) throws URISyntaxException {
        log.debug("REST request to update ProtectedFarm : {}, {}", id, protectedFarm);
        if (protectedFarm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, protectedFarm.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!protectedFarmRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProtectedFarm result = protectedFarmRepository.save(protectedFarm);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, protectedFarm.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /protected-farms/:id} : Partial updates given fields of an existing protectedFarm, field will ignore if it is null
     *
     * @param id the id of the protectedFarm to save.
     * @param protectedFarm the protectedFarm to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated protectedFarm,
     * or with status {@code 400 (Bad Request)} if the protectedFarm is not valid,
     * or with status {@code 404 (Not Found)} if the protectedFarm is not found,
     * or with status {@code 500 (Internal Server Error)} if the protectedFarm couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/protected-farms/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProtectedFarm> partialUpdateProtectedFarm(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProtectedFarm protectedFarm
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProtectedFarm partially : {}, {}", id, protectedFarm);
        if (protectedFarm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, protectedFarm.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!protectedFarmRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProtectedFarm> result = protectedFarmRepository
            .findById(protectedFarm.getId())
            .map(existingProtectedFarm -> {
                if (protectedFarm.getProtectedFarmID() != null) {
                    existingProtectedFarm.setProtectedFarmID(protectedFarm.getProtectedFarmID());
                }
                if (protectedFarm.getProtectedFarmName() != null) {
                    existingProtectedFarm.setProtectedFarmName(protectedFarm.getProtectedFarmName());
                }
                if (protectedFarm.getProtectedFarmType() != null) {
                    existingProtectedFarm.setProtectedFarmType(protectedFarm.getProtectedFarmType());
                }
                if (protectedFarm.getProtectedFarmSubType() != null) {
                    existingProtectedFarm.setProtectedFarmSubType(protectedFarm.getProtectedFarmSubType());
                }
                if (protectedFarm.getProtectedFarmDescription() != null) {
                    existingProtectedFarm.setProtectedFarmDescription(protectedFarm.getProtectedFarmDescription());
                }

                return existingProtectedFarm;
            })
            .map(protectedFarmRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, protectedFarm.getId().toString())
        );
    }

    /**
     * {@code GET  /protected-farms} : get all the protectedFarms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of protectedFarms in body.
     */
    @GetMapping("/protected-farms")
    public List<ProtectedFarm> getAllProtectedFarms() {
        log.debug("REST request to get all ProtectedFarms");
        return protectedFarmRepository.findAll();
    }

    /**
     * {@code GET  /protected-farms/:id} : get the "id" protectedFarm.
     *
     * @param id the id of the protectedFarm to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the protectedFarm, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/protected-farms/{id}")
    public ResponseEntity<ProtectedFarm> getProtectedFarm(@PathVariable Long id) {
        log.debug("REST request to get ProtectedFarm : {}", id);
        Optional<ProtectedFarm> protectedFarm = protectedFarmRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(protectedFarm);
    }

    /**
     * {@code DELETE  /protected-farms/:id} : delete the "id" protectedFarm.
     *
     * @param id the id of the protectedFarm to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/protected-farms/{id}")
    public ResponseEntity<Void> deleteProtectedFarm(@PathVariable Long id) {
        log.debug("REST request to delete ProtectedFarm : {}", id);
        protectedFarmRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
