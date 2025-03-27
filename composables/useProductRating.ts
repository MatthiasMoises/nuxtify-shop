export const useProductRating = () => {
  const productRating = ref(0);
  const ratingCount = ref(0);

  onMounted(() => {
    productRating.value = generateRating();
    ratingCount.value = generateRatingCount();
  })

  return {
    productRating,
    ratingCount
  }
}