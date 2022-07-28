package org.jhipster.blog.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.jhipster.blog.IntegrationTest;
import org.jhipster.blog.domain.ProtectedFarm;
import org.jhipster.blog.domain.enumeration.ProFarmType;
import org.jhipster.blog.domain.enumeration.ProSubType;
import org.jhipster.blog.repository.ProtectedFarmRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ProtectedFarmResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProtectedFarmResourceIT {

    private static final UUID DEFAULT_PROTECTED_FARM_ID = UUID.randomUUID();
    private static final UUID UPDATED_PROTECTED_FARM_ID = UUID.randomUUID();

    private static final String DEFAULT_PROTECTED_FARM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROTECTED_FARM_NAME = "BBBBBBBBBB";

    private static final ProFarmType DEFAULT_PROTECTED_FARM_TYPE = ProFarmType.SN_Shade;
    private static final ProFarmType UPDATED_PROTECTED_FARM_TYPE = ProFarmType.Net;

    private static final ProSubType DEFAULT_PROTECTED_FARM_SUB_TYPE = ProSubType.Femto;
    private static final ProSubType UPDATED_PROTECTED_FARM_SUB_TYPE = ProSubType.Pico;

    private static final String DEFAULT_PROTECTED_FARM_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_PROTECTED_FARM_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/protected-farms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProtectedFarmRepository protectedFarmRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProtectedFarmMockMvc;

    private ProtectedFarm protectedFarm;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProtectedFarm createEntity(EntityManager em) {
        ProtectedFarm protectedFarm = new ProtectedFarm()
            .protectedFarmID(DEFAULT_PROTECTED_FARM_ID)
            .protectedFarmName(DEFAULT_PROTECTED_FARM_NAME)
            .protectedFarmType(DEFAULT_PROTECTED_FARM_TYPE)
            .protectedFarmSubType(DEFAULT_PROTECTED_FARM_SUB_TYPE)
            .protectedFarmDescription(DEFAULT_PROTECTED_FARM_DESCRIPTION);
        return protectedFarm;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProtectedFarm createUpdatedEntity(EntityManager em) {
        ProtectedFarm protectedFarm = new ProtectedFarm()
            .protectedFarmID(UPDATED_PROTECTED_FARM_ID)
            .protectedFarmName(UPDATED_PROTECTED_FARM_NAME)
            .protectedFarmType(UPDATED_PROTECTED_FARM_TYPE)
            .protectedFarmSubType(UPDATED_PROTECTED_FARM_SUB_TYPE)
            .protectedFarmDescription(UPDATED_PROTECTED_FARM_DESCRIPTION);
        return protectedFarm;
    }

    @BeforeEach
    public void initTest() {
        protectedFarm = createEntity(em);
    }

    @Test
    @Transactional
    void createProtectedFarm() throws Exception {
        int databaseSizeBeforeCreate = protectedFarmRepository.findAll().size();
        // Create the ProtectedFarm
        restProtectedFarmMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(protectedFarm)))
            .andExpect(status().isCreated());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeCreate + 1);
        ProtectedFarm testProtectedFarm = protectedFarmList.get(protectedFarmList.size() - 1);
        assertThat(testProtectedFarm.getProtectedFarmID()).isEqualTo(DEFAULT_PROTECTED_FARM_ID);
        assertThat(testProtectedFarm.getProtectedFarmName()).isEqualTo(DEFAULT_PROTECTED_FARM_NAME);
        assertThat(testProtectedFarm.getProtectedFarmType()).isEqualTo(DEFAULT_PROTECTED_FARM_TYPE);
        assertThat(testProtectedFarm.getProtectedFarmSubType()).isEqualTo(DEFAULT_PROTECTED_FARM_SUB_TYPE);
        assertThat(testProtectedFarm.getProtectedFarmDescription()).isEqualTo(DEFAULT_PROTECTED_FARM_DESCRIPTION);
    }

    @Test
    @Transactional
    void createProtectedFarmWithExistingId() throws Exception {
        // Create the ProtectedFarm with an existing ID
        protectedFarm.setId(1L);

        int databaseSizeBeforeCreate = protectedFarmRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProtectedFarmMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(protectedFarm)))
            .andExpect(status().isBadRequest());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllProtectedFarms() throws Exception {
        // Initialize the database
        protectedFarmRepository.saveAndFlush(protectedFarm);

        // Get all the protectedFarmList
        restProtectedFarmMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(protectedFarm.getId().intValue())))
            .andExpect(jsonPath("$.[*].protectedFarmID").value(hasItem(DEFAULT_PROTECTED_FARM_ID.toString())))
            .andExpect(jsonPath("$.[*].protectedFarmName").value(hasItem(DEFAULT_PROTECTED_FARM_NAME)))
            .andExpect(jsonPath("$.[*].protectedFarmType").value(hasItem(DEFAULT_PROTECTED_FARM_TYPE.toString())))
            .andExpect(jsonPath("$.[*].protectedFarmSubType").value(hasItem(DEFAULT_PROTECTED_FARM_SUB_TYPE.toString())))
            .andExpect(jsonPath("$.[*].protectedFarmDescription").value(hasItem(DEFAULT_PROTECTED_FARM_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getProtectedFarm() throws Exception {
        // Initialize the database
        protectedFarmRepository.saveAndFlush(protectedFarm);

        // Get the protectedFarm
        restProtectedFarmMockMvc
            .perform(get(ENTITY_API_URL_ID, protectedFarm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(protectedFarm.getId().intValue()))
            .andExpect(jsonPath("$.protectedFarmID").value(DEFAULT_PROTECTED_FARM_ID.toString()))
            .andExpect(jsonPath("$.protectedFarmName").value(DEFAULT_PROTECTED_FARM_NAME))
            .andExpect(jsonPath("$.protectedFarmType").value(DEFAULT_PROTECTED_FARM_TYPE.toString()))
            .andExpect(jsonPath("$.protectedFarmSubType").value(DEFAULT_PROTECTED_FARM_SUB_TYPE.toString()))
            .andExpect(jsonPath("$.protectedFarmDescription").value(DEFAULT_PROTECTED_FARM_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingProtectedFarm() throws Exception {
        // Get the protectedFarm
        restProtectedFarmMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProtectedFarm() throws Exception {
        // Initialize the database
        protectedFarmRepository.saveAndFlush(protectedFarm);

        int databaseSizeBeforeUpdate = protectedFarmRepository.findAll().size();

        // Update the protectedFarm
        ProtectedFarm updatedProtectedFarm = protectedFarmRepository.findById(protectedFarm.getId()).get();
        // Disconnect from session so that the updates on updatedProtectedFarm are not directly saved in db
        em.detach(updatedProtectedFarm);
        updatedProtectedFarm
            .protectedFarmID(UPDATED_PROTECTED_FARM_ID)
            .protectedFarmName(UPDATED_PROTECTED_FARM_NAME)
            .protectedFarmType(UPDATED_PROTECTED_FARM_TYPE)
            .protectedFarmSubType(UPDATED_PROTECTED_FARM_SUB_TYPE)
            .protectedFarmDescription(UPDATED_PROTECTED_FARM_DESCRIPTION);

        restProtectedFarmMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProtectedFarm.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProtectedFarm))
            )
            .andExpect(status().isOk());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeUpdate);
        ProtectedFarm testProtectedFarm = protectedFarmList.get(protectedFarmList.size() - 1);
        assertThat(testProtectedFarm.getProtectedFarmID()).isEqualTo(UPDATED_PROTECTED_FARM_ID);
        assertThat(testProtectedFarm.getProtectedFarmName()).isEqualTo(UPDATED_PROTECTED_FARM_NAME);
        assertThat(testProtectedFarm.getProtectedFarmType()).isEqualTo(UPDATED_PROTECTED_FARM_TYPE);
        assertThat(testProtectedFarm.getProtectedFarmSubType()).isEqualTo(UPDATED_PROTECTED_FARM_SUB_TYPE);
        assertThat(testProtectedFarm.getProtectedFarmDescription()).isEqualTo(UPDATED_PROTECTED_FARM_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingProtectedFarm() throws Exception {
        int databaseSizeBeforeUpdate = protectedFarmRepository.findAll().size();
        protectedFarm.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProtectedFarmMockMvc
            .perform(
                put(ENTITY_API_URL_ID, protectedFarm.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(protectedFarm))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProtectedFarm() throws Exception {
        int databaseSizeBeforeUpdate = protectedFarmRepository.findAll().size();
        protectedFarm.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProtectedFarmMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(protectedFarm))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProtectedFarm() throws Exception {
        int databaseSizeBeforeUpdate = protectedFarmRepository.findAll().size();
        protectedFarm.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProtectedFarmMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(protectedFarm)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProtectedFarmWithPatch() throws Exception {
        // Initialize the database
        protectedFarmRepository.saveAndFlush(protectedFarm);

        int databaseSizeBeforeUpdate = protectedFarmRepository.findAll().size();

        // Update the protectedFarm using partial update
        ProtectedFarm partialUpdatedProtectedFarm = new ProtectedFarm();
        partialUpdatedProtectedFarm.setId(protectedFarm.getId());

        partialUpdatedProtectedFarm.protectedFarmName(UPDATED_PROTECTED_FARM_NAME);

        restProtectedFarmMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProtectedFarm.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProtectedFarm))
            )
            .andExpect(status().isOk());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeUpdate);
        ProtectedFarm testProtectedFarm = protectedFarmList.get(protectedFarmList.size() - 1);
        assertThat(testProtectedFarm.getProtectedFarmID()).isEqualTo(DEFAULT_PROTECTED_FARM_ID);
        assertThat(testProtectedFarm.getProtectedFarmName()).isEqualTo(UPDATED_PROTECTED_FARM_NAME);
        assertThat(testProtectedFarm.getProtectedFarmType()).isEqualTo(DEFAULT_PROTECTED_FARM_TYPE);
        assertThat(testProtectedFarm.getProtectedFarmSubType()).isEqualTo(DEFAULT_PROTECTED_FARM_SUB_TYPE);
        assertThat(testProtectedFarm.getProtectedFarmDescription()).isEqualTo(DEFAULT_PROTECTED_FARM_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateProtectedFarmWithPatch() throws Exception {
        // Initialize the database
        protectedFarmRepository.saveAndFlush(protectedFarm);

        int databaseSizeBeforeUpdate = protectedFarmRepository.findAll().size();

        // Update the protectedFarm using partial update
        ProtectedFarm partialUpdatedProtectedFarm = new ProtectedFarm();
        partialUpdatedProtectedFarm.setId(protectedFarm.getId());

        partialUpdatedProtectedFarm
            .protectedFarmID(UPDATED_PROTECTED_FARM_ID)
            .protectedFarmName(UPDATED_PROTECTED_FARM_NAME)
            .protectedFarmType(UPDATED_PROTECTED_FARM_TYPE)
            .protectedFarmSubType(UPDATED_PROTECTED_FARM_SUB_TYPE)
            .protectedFarmDescription(UPDATED_PROTECTED_FARM_DESCRIPTION);

        restProtectedFarmMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProtectedFarm.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProtectedFarm))
            )
            .andExpect(status().isOk());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeUpdate);
        ProtectedFarm testProtectedFarm = protectedFarmList.get(protectedFarmList.size() - 1);
        assertThat(testProtectedFarm.getProtectedFarmID()).isEqualTo(UPDATED_PROTECTED_FARM_ID);
        assertThat(testProtectedFarm.getProtectedFarmName()).isEqualTo(UPDATED_PROTECTED_FARM_NAME);
        assertThat(testProtectedFarm.getProtectedFarmType()).isEqualTo(UPDATED_PROTECTED_FARM_TYPE);
        assertThat(testProtectedFarm.getProtectedFarmSubType()).isEqualTo(UPDATED_PROTECTED_FARM_SUB_TYPE);
        assertThat(testProtectedFarm.getProtectedFarmDescription()).isEqualTo(UPDATED_PROTECTED_FARM_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingProtectedFarm() throws Exception {
        int databaseSizeBeforeUpdate = protectedFarmRepository.findAll().size();
        protectedFarm.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProtectedFarmMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, protectedFarm.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(protectedFarm))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProtectedFarm() throws Exception {
        int databaseSizeBeforeUpdate = protectedFarmRepository.findAll().size();
        protectedFarm.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProtectedFarmMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(protectedFarm))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProtectedFarm() throws Exception {
        int databaseSizeBeforeUpdate = protectedFarmRepository.findAll().size();
        protectedFarm.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProtectedFarmMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(protectedFarm))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProtectedFarm in the database
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProtectedFarm() throws Exception {
        // Initialize the database
        protectedFarmRepository.saveAndFlush(protectedFarm);

        int databaseSizeBeforeDelete = protectedFarmRepository.findAll().size();

        // Delete the protectedFarm
        restProtectedFarmMockMvc
            .perform(delete(ENTITY_API_URL_ID, protectedFarm.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProtectedFarm> protectedFarmList = protectedFarmRepository.findAll();
        assertThat(protectedFarmList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
