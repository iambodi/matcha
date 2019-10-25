<template>
    <v-card max-width="400" class="text-center">
            <v-card-title class="deep-orange lighten-1 white--text mb-4">Tags</v-card-title>
        <v-card-text>
                <v-chip-group
                    column
                    multiple
                    active-class='deep-orange lighten-1 white--text'
                    v-model="selectedNumber"
                >
                <v-chip
                    v-for="(tag, i) in tags"
                    :key="i"
                    @click="check(tag)"
                > 
                    {{ tag }}
                </v-chip>
                </v-chip-group>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                id: "2932",
                tags: ['Netflix & chill', 'Athletic', 'Gastronomy', 'Nature lovers', 'Nightlife', 'Adventurer'],
                selectedNumber: [],
                selected : [],
            }
        },
        mounted(){
            this.getPrefTags();
        },
        methods : {
          check (tag) {
            if (this.selected.includes(tag)){
                var index = this.selected.indexOf(tag);                
                    this.selected.splice(index, 1);
                axios.get("http://localhost:8001/removePrefTag/" + this.id + "/" + (this.tags.indexOf(tag) + 1), {})
            }
            else
            {
                this.selected.push(tag);
                axios.post("http://localhost:8001/addPrefTag/", {id_user:this.id, id_tag:(this.tags.indexOf(tag) + 1)}) // a voir si ca marche
            }
          },
          async getPrefTags(){
            try {
              const res = await axios.get("http://localhost:8001/getPreferenceTags/" + this.id, {});
              if (res.data && res.data.prefTags && res.data.prefTags.length > 0) {
             //     console.log(res.data.prefTags);
                    for (var i = 0; i < res.data.prefTags.length; i++) {
                      this.selected.push(this.tags[(res.data.prefTags[i].id_tag - 1)]);
                      this.selectedNumber.push(res.data.prefTags[i].id_tag - 1);
                    }
              }
            } catch (error) {
            //  this.resText = 'Error, please retry';
              }
          },
        }
    }
</script>