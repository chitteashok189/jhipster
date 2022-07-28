package org.jhipster.blog.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.jhipster.blog.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProtectedFarmTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProtectedFarm.class);
        ProtectedFarm protectedFarm1 = new ProtectedFarm();
        protectedFarm1.setId(1L);
        ProtectedFarm protectedFarm2 = new ProtectedFarm();
        protectedFarm2.setId(protectedFarm1.getId());
        assertThat(protectedFarm1).isEqualTo(protectedFarm2);
        protectedFarm2.setId(2L);
        assertThat(protectedFarm1).isNotEqualTo(protectedFarm2);
        protectedFarm1.setId(null);
        assertThat(protectedFarm1).isNotEqualTo(protectedFarm2);
    }
}
