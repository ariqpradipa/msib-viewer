<template>
    <div class="bg-only-black min-h-screen font-poppins pt-5">
        <div class="flex justify-center p-5">
            <p class="text-only-white font-bold text-xl md:text-4xl">MSIB Viewer | Magang</p>
        </div>
        <form class="flex flex-col justify-center items-center mb-6" @submit.prevent="fetchFilteredActivities">
            <div class="grid gap-x-8 md:w-1/2">
                <div class="flex flex-row gap-8">
                    <div class="flex flex-wrap -mx-3">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <input
                                class="appearance-none block w-full bg-only-dark-gray text-only-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-only-white focus:text-only-dark-gray"
                                id="posisi-filter" type="text" placeholder="Semua Posisi" v-model="posisi">
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <input
                                class="appearance-none block w-full bg-only-dark-gray text-only-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-only-white focus:text-only-dark-gray"
                                id="lokasi-filter" type="text" placeholder="Semua Lokasi" v-model="lokasi">
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <input
                                class="appearance-none block w-full bg-only-dark-gray text-only-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-only-white focus:text-only-dark-gray"
                                id="mitra-filter" type="text" placeholder="Semua Perusahaan" v-model="mitra">
                        </div>

                    </div>
                    <div>
                        <button
                            class="flex-shrink-0 font-poppins border-transparent border-4 bg-only-purple text-only-white font-bold hover:bg-only-dark-gray text-lg py-1 px-8 rounded"
                            type="submit">
                            Cari
                        </button>
                    </div>
                </div>

                <div class="flex items-center gap-8">
                    <p class="text-only-white font-bold">Tipe Lowongan: </p>
                    <div class="grid grid-cols-3 gap-8 text-center w-9/12">
                        <label>
                            <input type="radio" value="semua" class="peer hidden" name="opportunity_type" checked>
                            <div
                                class="bg-only-dark-gray rounded-full p-2 hover:bg-only-purple peer-checked:bg-only-purple peer-checked:border-2  peer-checked:border-only-white cursor-pointer peer-checked:font-bold">
                                <p class="text-only-white text-center">Semua</p>
                            </div>
                        </label>
                        <label>
                            <input type="radio" value="semua" class="peer hidden" name="opportunity_type">
                            <div
                                class="bg-only-dark-gray rounded-full p-2 hover:bg-only-purple peer-checked:bg-only-purple peer-checked:border-2  peer-checked:border-only-white cursor-pointer peer-checked:font-bold">
                                <p class="text-only-white text-center">MSIB</p>
                            </div>
                        </label>
                        <label>
                            <input type="radio" value="semua" class="peer hidden" name="opportunity_type">
                            <div
                                class="bg-only-dark-gray rounded-full p-2 hover:bg-only-purple peer-checked:bg-only-purple peer-checked:border-2  peer-checked:border-only-white cursor-pointer peer-checked:font-bold">
                                <p class="text-only-white text-center">Mandiri</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </form>

        <div class="flex justify-center w-full">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-5 m-2 md:m-0">
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
            posisi: "",
            lokasi: "",
            mitra: "",
            isLoading: false, // To prevent multiple simultaneous requests
        }
    },
    methods: {
        fetchActivities() {
            fetch(`https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/position?offset=${this.offset}&limit=${this.limit}&location_key=${this.lokasi}&mitra_key=${this.mitra}&keyword=${this.posisi}&sector_id=&sort_by=published_time&order=desc`)
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
        fetchFilteredActivities() {
            this.activities = [];
            this.offset = 0;
            this.fetchActivities();
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