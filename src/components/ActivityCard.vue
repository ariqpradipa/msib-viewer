<template>
    <div
        class="animate__animated animate__fadeIn animate__slow transition-transform duration-300 hover:scale-105 font-poppins relative flex flex-col md:flex-row md:space-x-2 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-[29rem] bg-only-dark-gray">
        <div class="w-full h-full md:w-1/3 bg-only-white rounded-md grid place-items-center p-2">
            <img :src=logo alt="mitra logo" class="rounded-xl" />
        </div>
        <div class="w-full md:w-2/3 bg-only-dark-gray flex flex-col gap-1 p-3 justify-between">
            <h3 class="font-bold text-only-white md:text-sm text-sm underline">{{ name }}</h3>
            <p class="md:text-xs text-only-white text-xs">{{ mitra_name }}</p>
            <p class="md:text-xs text-only-white text-[10px]">{{ location }} | {{ activity_type }}</p>
            <p class="md:text-xs text-only-gray text-[10px]">{{ credits_count }} sks | {{ months_duration }} bulan</p>
            <p class="md:text-xs text-only-gray text-[10px]">Peserta: {{ participants_count }}</p>
            <p class="md:text-xs font-bold text-only-blue text-xs">{{ certified ? "certified" : null }}</p>
            <div class="flex justify-end items-end">
                <div class="bg-only-purple p-1 px-2 rounded-full">
                    <p class="md:text-sm font-bold text-only-white text-xs">{{ opportunity_type }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ActivityCard',
    props: {
        opportunity_type: String,
        name: String,
        activity_type: String,
        location: String,
        months_duration: Number,
        credits_count: Number,
        mitra_name: String,
        mitra_brand_name: String,
        logo: String,
        participants_count: Number,
        certified: Boolean,
        start_duration: String,
        end_duration: String,
    },
    methods: {
        getTotalMonths(startDateStr?: string, endDateStr?: string): number {

            if (!startDateStr || !endDateStr) return 0;

            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);

            let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
            months -= startDate.getMonth();
            months += endDate.getMonth();

            return months <= 0 ? 0 : months;

        }
    }
}
</script>