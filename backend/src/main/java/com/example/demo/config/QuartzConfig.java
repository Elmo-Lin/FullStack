package com.example.demo.config;

import com.example.demo.scheduler.SampleQuartzJob;
import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class QuartzConfig {

    @Value("${scheduler.sampleJobEnabled:false}")
    private boolean sampleJobEnabled;

    @Bean
    public JobDetail sampleJobDetail() {
        if (!sampleJobEnabled) {
            return null;  // 或不註冊
        }
        return JobBuilder.newJob(SampleQuartzJob.class)
                .withIdentity("sampleJob")
                .storeDurably()
                .build();
    }

    @Bean
    public Trigger sampleJobTrigger() {
        if (!sampleJobEnabled) {
            return null;
        }
        return TriggerBuilder.newTrigger()
                .forJob(sampleJobDetail())
                .withIdentity("sampleTrigger")
                .withSchedule(CronScheduleBuilder.cronSchedule("* * 1 * * ?"))
                .build();
    }
}
