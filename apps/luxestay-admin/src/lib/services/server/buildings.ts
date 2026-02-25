//    async create(input: CreateApartmentInput, createdBy: string) {
//       const [apartment] = await db
//         .insert(apartments)
//         .values({ ...input, createdBy })
//         .returning();
//       return apartment;
//     },
//     async update(id: string, input: UpdateApartmentInput) {
//       const [updated] = await db
//         .update(apartments)
//         .set({ ...input, updatedAt: new Date() })
//         .where(eq(apartments.id, id))
//         .returning();
//       return updated;
//     },
//     async delete(id: string) {
//       await db.delete(apartments).where(eq(apartments.id, id));
//     },

export class BuildingsServerService {}
