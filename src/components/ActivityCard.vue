<template>
    <div
        class="font-poppins relative flex flex-col md:flex-row md:space-x-2 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-[28rem] bg-only-dark-gray">
        <div class="w-full md:w-1/3 bg-only-white rounded-md grid place-items-center">
            <img :src=logo alt="mitra logo" class="rounded-xl" />
        </div>
        <div class="w-full md:w-2/3 bg-only-dark-gray flex flex-col gap-1 p-3">
            <h3 class="font-black text-only-white md:text-sm text-lg underline">{{ name }}</h3>
            <p class="md:text-xs text-only-white text-sm">{{ activity_name }}</p>
            <p class="md:text-[10px] text-only-white text-xs">{{ mitra_name }} | {{ location }}</p>
            <p class="md:text-[10px] text-only-gray text-xs">{{ credits_count }} sks | {{ getTotalMonths(start_duration,
                end_duration) }} bulan</p>
            <p class="md:text-xs font-bold text-only-blue text-xs">{{ certified ? "certified" : null }}</p>
            <div class="flex justify-end items-end">
                <div class="bg-only-purple p-1 px-2 rounded-full">
                    <p class="md:text-sm font-bold text-only-white text-xs">{{ total }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ActivityCard',
    props: {
        name: String,
        activity_name: String,
        total: Number,
        credits_count: Number,
        location: String,
        certified: Boolean,
        logo: String,
        mitra_name: String,
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