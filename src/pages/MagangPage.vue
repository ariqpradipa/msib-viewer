<template>
    <div class="bg-only-black min-h-screen">
        <div class="pt-5">
            <div class="flex flex-col justify-center items-center md:grid md:grid-cols-3 gap-5" ref="scrollComponent">
                <ActivityCard v-for="(activity, index) in activities" :key="index" :name="activity.name"
                    :activity_name="activity.activity_name" :total="activity.total" :credits_count="activity.credits_count"
                    :location="activity.location" :certified="activity.certified" :logo="activity.logo"
                    :mitra_name="activity.mitra_name" :start_duration="activity.start_duration"
                    :end_duration="activity.end_duration" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ActivityCard from '@/components/ActivityCard.vue'

export default {
    name: 'MagangPage',
    components: {
        ActivityCard,
    },
    data() {
        return {
            activities: [] as {
                name: string;
                activity_name: string;
                total: number;
                credits_count: number;
                location: string;
                certified: boolean;
                logo: string;
                mitra_name: string;
                start_duration: string;
                end_duration: string;
            }[],
            offset: 0, // Keep track of your current offset
            limit: 20, // Set your limit per fetch
            isLoading: false, // To prevent multiple simultaneous requests
        }
    },
    methods: {
        fetchActivities() {
            fetch(`https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/position?offset=${this.offset}&limit=${this.limit}&location_key=&mitra_key=&keyword=&sector_id=&sort_by=published_time&order=desc`)
                .then(response => response.json())
                .then(data => {
                    this.activities = [...this.activities, ...data.data.map((activity: any) => {
                        return {
                            name: activity.name,
                            activity_name: activity.activity_name,
                            total: activity.total,
                            credits_count: activity.credits_count,
                            location: activity.location,
                            certified: activity.certified,
                            logo: activity.logo === "" ? 'https://kampusmerdeka.kemdikbud.go.id/static/media/logo-placeholder.b736d945.webp' : activity.logo,
                            mitra_name: activity.mitra_name,
                            start_duration: activity.start_duration,
                            end_duration: activity.end_duration,
                        }
                    })];
                    this.offset += this.limit; // Update the offset
                })
                .catch(error => console.error('Error fetching activities:', error))
        },
        fetchNextActivity() {

            if (this.isLoading) return; // Prevent multiple requests
            this.isLoading = true;

            try {
                this.fetchActivities();
            } catch (error) {
                console.error('Error fetching activities:', error)
            } finally {
                this.isLoading = false;
            }
        },
        handleScroll() {
            let scrollTotal = document.documentElement.scrollTop + window.innerHeight;
            let heightThreshold = document.documentElement.offsetHeight - 5; // Adjust this value as needed

            if (scrollTotal > heightThreshold && !this.isLoading) {
                this.fetchNextActivity();
            }
        }
    },
    beforeMount() {
        this.fetchActivities(); // Initial fetch
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll)
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScroll)
    }
}

</script>