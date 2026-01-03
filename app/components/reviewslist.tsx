"use client";

type Review = {
  id: string;
  rating: number;
  comment?: string | null;
};

export default function ReviewsList({
  reviews,
}: {
  reviews: Review[];
}) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-sm text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div
          key={r.id}
          className="border rounded-lg p-4 bg-white"
        >
          <div className="font-semibold">
            Rating: {r.rating} / 5
          </div>

          {r.comment && (
            <p className="text-sm text-gray-600 mt-2">
              {r.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
	
